import { Fragment } from 'react/jsx-runtime';
import { NavLink, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { conversations } from './data/convo.json';
import { Separator } from '@/components/ui/separator';
import { PageContainer } from '@/components/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MessagesPage() {
  const { pathname } = useLocation();

  return (
    <PageContainer
      className={cn('hidden lg:block p-4', {
        block: pathname === '/crm/messages',
      })}
    >
      <div className="">
        {conversations.map((chatUsr) => {
          const { id: chatId, profile, username, messages, fullName } = chatUsr;
          return (
            <Fragment key={chatId}>
              <NavLink
                to={`/crm/messages/${chatId}`}
                className={({ isActive }) =>
                  cn(
                    'flex w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary/75',
                    {
                      'sm:bg-muted': isActive,
                    }
                  )
                }
              >
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={profile} alt={username} />
                    <AvatarFallback>{username}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="col-start-2 row-span-2 font-medium">
                      {fullName}
                    </span>
                    <span className="col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground">
                      {messages[messages.length - 1].message}
                    </span>
                  </div>
                </div>
              </NavLink>
              <Separator className="my-1" />
            </Fragment>
          );
        })}
      </div>
    </PageContainer>
  );
}
