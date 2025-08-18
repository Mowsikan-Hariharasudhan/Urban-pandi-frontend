import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { reviewAPI } from '@/services/api';
import { useAuth } from '../contexts/AuthContext';
import StarRating from './StarRating';
import { User, Calendar, Edit, Trash2 } from 'lucide-react';

type Review = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment?: string;
  createdAt: string;
};

type ReviewSectionProps = {
  businessId: string;
};

const ReviewSection = ({ businessId }: ReviewSectionProps) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [businessId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await reviewAPI.getBusinessReviews(businessId);
      setReviews(response.data);
      
      // Check if current user has already reviewed
      if (isAuthenticated && user) {
        const existingReview = response.data.find(
          (review: Review) => review.user._id === user.id
        );
        if (existingReview) {
          setUserReview(existingReview);
          setNewRating(existingReview.rating);
          setNewComment(existingReview.comment || '');
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch reviews',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (newRating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a star rating',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (userReview) {
        // Update existing review
        await reviewAPI.updateReview(userReview._id, {
          rating: newRating,
          comment: newComment
        });
        
        toast({
          title: 'Review Updated',
          description: 'Your review has been updated successfully',
        });
      } else {
        // Create new review
        await reviewAPI.createReview({
          businessId,
          rating: newRating,
          comment: newComment
        });
        
        toast({
          title: 'Review Submitted',
          description: 'Your review has been submitted successfully',
        });
      }
      
      // Refresh reviews
      fetchReviews();
      setIsReviewDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error.response?.data?.message || 'An error occurred while submitting your review',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;
    
    try {
      setIsSubmitting(true);
      await reviewAPI.deleteReview(reviewToDelete);
      
      toast({
        title: 'Review Deleted',
        description: 'Your review has been deleted successfully',
      });
      
      setUserReview(null);
      setNewRating(0);
      setNewComment('');
      fetchReviews();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Deletion Failed',
        description: 'An error occurred while deleting your review',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteReview = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setIsDeleteDialogOpen(true);
  };

  const openReviewDialog = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please login to leave a review',
      });
      return;
    }
    
    setIsReviewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Customer Reviews</h3>
        {!userReview ? (
          <Button 
            onClick={openReviewDialog}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            Write a Review
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsReviewDialogOpen(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Review
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => confirmDeleteReview(userReview._id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No reviews yet. Be the first to review this business!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review._id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {review.user.firstName} {review.user.lastName}
                    </CardTitle>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </CardHeader>
              
              {review.comment && (
                <CardContent className="pt-2">
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              )}
              
              {user && review.user._id === user.id && (
                <CardFooter className="pt-2 pb-4 flex justify-end">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => setIsReviewDialogOpen(true)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => confirmDeleteReview(review._id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
      
      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{userReview ? 'Edit Your Review' : 'Write a Review'}</DialogTitle>
            <DialogDescription>
              Share your experience with this business. Your feedback helps others make better choices.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <StarRating 
                rating={newRating} 
                interactive={true} 
                size="lg" 
                onRatingChange={setNewRating} 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment (Optional)</label>
              <Textarea
                id="comment"
                placeholder="Share your experience with this business..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview} 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {userReview ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                userReview ? 'Update Review' : 'Submit Review'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteReview} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                'Delete Review'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewSection;