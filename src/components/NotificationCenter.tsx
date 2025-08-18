import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { offersAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  _id: string;
  status: 'sent' | 'accepted' | 'declined';
  updatedAt: string;
  request: { title: string };
  provider: { firstName: string; lastName: string };
}

const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications on user change to update badge count
  useEffect(() => {
    if (user) {
      offersAPI.getNotifications()
        .then(res => setNotifications(res.data))
        .catch(err => console.error('Error loading notifications', err));
    }
  }, [user]);

  useEffect(() => {
    if (open && user) {
      setLoading(true);
      offersAPI.getNotifications()
        .then(res => {
          setNotifications(res.data);
        })
        .catch(err => console.error('Error loading notifications', err))
        .finally(() => setLoading(false));
    }
  }, [open, user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="fixed bottom-20 left-8 z-50 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-700" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
  <DialogContent
    className="fixed bottom-30 left-8 z-50 w-80 p-0 transform-gpu origin-bottom-left transition-transform transition-opacity duration-100 ease-out"
    style={{
      transform: open ? 'scale(1)' : 'scale(0.75)',
      opacity: open ? 1 : 0,
    }}
  >
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Notifications</DialogTitle>
        </DialogHeader>
        <div className="p-4 max-h-64 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            notifications.length > 0 ? (
              <ul className="space-y-3">
                {notifications.map(n => (
                  <li key={n._id} className="space-y-1">
                    <p className="text-sm text-gray-800">
                      {n.status === 'sent' ? (
                        <>You have a new offer for "{n.request.title}" from <strong>{n.provider.firstName} {n.provider.lastName}</strong>.</>
                      ) : (
                        <>Your offer for "{n.request.title}" was <strong className="capitalize">{n.status}</strong>.</>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(n.updatedAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No notifications.</p>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
