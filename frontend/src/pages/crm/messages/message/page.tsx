import { LoadingButton } from '@/components/loading-button';
import { PageContainer } from '@/components/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronLeftIcon, SendHorizontalIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { Convo } from '../data/chat-types';
import { conversations } from '../data/convo.json';

export default function MessagePage() {
  const { id } = useParams();
  const selectedUser = conversations.find(({ id: chatId }) => chatId === id);
  const mobileSelectedUser = selectedUser;

  const currentMessage = selectedUser?.messages.reduce(
    (acc: Record<string, Convo[]>, obj) => {
      const key = format(obj.timestamp, 'd MMM, yyyy');

      // Create an array for the category if it doesn't exist
      if (!acc[key]) {
        acc[key] = [];
      }

      // Push the current object to the array
      acc[key].push(obj);

      return acc;
    },
    {}
  );

  return (
    <PageContainer className="p-4">
      <div
        className={cn(
          'absolute inset-0 h-full left-full z-50 overflow-hidden hidden w-full flex-1 flex-col sm:rounded-xl sm:border bg-muted dark:bg-background shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex',
          mobileSelectedUser && 'left-0 flex'
        )}
      >
        {/* Top Part */}
        <div className="flex flex-none justify-between bg-background p-4 shadow-xs">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="-ml-2 h-full lg:hidden"
            >
              <Link to="/crm/messages">
                <ChevronLeftIcon />
              </Link>
            </Button>
            <div className="flex items-center gap-2 lg:gap-4">
              <Avatar className="size-9 lg:size-11">
                <AvatarImage
                  src={selectedUser?.profile}
                  alt={selectedUser?.username}
                />
                <AvatarFallback>{selectedUser?.username}</AvatarFallback>
              </Avatar>
              <div>
                <span className="col-start-2 row-span-2 text-sm font-medium lg:text-base">
                  {selectedUser?.fullName}
                </span>
                <span className="col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-ellipsis text-nowrap text-xs text-muted-foreground lg:max-w-none lg:text-sm">
                  {selectedUser?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="-mr-1 flex items-center gap-1 lg:gap-2">
            <Button asChild>
              <Link to={`/crm/requests/${selectedUser?.id}`}>Open request</Link>
            </Button>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex flex-1 flex-col rounded-md">
          <div className="flex size-full flex-1 px-4">
            <div className="chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden">
              <div className="chat-flex flex h-40 w-full flex-grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pb-4 pr-4">
                {currentMessage &&
                  Object.keys(currentMessage).map((key) => (
                    <Fragment key={key}>
                      {currentMessage[key].map((msg, index) => (
                        <div
                          key={`${msg.sender}-${msg.timestamp}-${index}`}
                          className={cn(
                            'chat-box max-w-72 break-words px-3 py-2 shadow-lg',
                            msg.sender === 'You'
                              ? 'self-end rounded-[16px_16px_0_16px] bg-primary text-primary-foreground'
                              : 'self-start rounded-[16px_16px_16px_0] bg-secondary'
                          )}
                        >
                          {msg.message}{' '}
                          <span
                            className={cn(
                              'mt-1 block text-xs font-light italic text-muted-foreground',
                              msg.sender === 'You' && 'text-right'
                            )}
                          >
                            {format(msg.timestamp, 'h:mm a')}
                          </span>
                        </div>
                      ))}
                      <div className="text-center text-xs">{key}</div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-background p-4 pb-12">
            <form className="flex w-full flex-none gap-2">
              <Textarea
                placeholder="Type your message..."
                wrap="off"
                className="resize-none bg-secondary"
                rows={10}
              />
              <LoadingButton
                disabled={false}
                loading={false}
                type="submit"
                className="uppercase"
              >
                <span className="flex items-center gap-2">
                  <SendHorizontalIcon />
                  <span className="hidden sm:block">Send</span>
                </span>
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
