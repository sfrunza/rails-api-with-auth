import { SquarePenIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import { LoadingButton } from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import SettingPageWrapper from '../setting-page-wrapper';

import { PriceInput } from '@/components/ui/price-input';
import { formatCentsToDollarsString, hexToRgb } from '@/lib/helpers';
import {
  useBulkUpdateRatesMutation,
  useGetRatesQuery,
} from '@/services/rates-api';
import { type Rate } from '@/types/rate';

const tableGrid =
  'grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 px-1 text-sm font-medium';

export default function RatesPage() {
  const { data: dbRates, isLoading } = useGetRatesQuery();
  const [bulkUpdateRates, { isLoading: isUpdating }] =
    useBulkUpdateRatesMutation();

  const [items, setItems] = useState<Rate[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [currentEdit, setCurrentEdit] = useState<number | null>(null);

  useEffect(() => {
    if (dbRates) {
      setItems(dbRates);
    }
  }, [dbRates]);

  function handleUpdateRate(rate: Rate) {
    const updatedItems = items.map((item) =>
      item.id === rate.id ? rate : item
    );

    setItems(updatedItems);
    setIsChanged(true);
  }

  return (
    <SettingPageWrapper title="Rates">
      <Card>
        <CardContent className="space-y-4">
          <ScrollArea className="w-full">
            <div className={cn('mb-4 text-muted-foreground', tableGrid)}>
              <p>Name</p>
              <p>2 movers</p>
              <p>3 movers</p>
              <p>4 movers</p>
              <p>Extra mover</p>
              <p>Extra truck</p>
              <p>On/Off</p>
              <p></p>
            </div>
            <Separator />
            <div className="min-w-[900px] divide-y">
              {isLoading && <LoadingSkeleton />}
              {items?.map((rate, idx) => (
                <div key={idx} className={cn('py-4', tableGrid)}>
                  {currentEdit === idx ? (
                    <div className="grid grid-cols-[auto_36px] gap-2">
                      <Input
                        value={rate.name}
                        onChange={(e) => {
                          handleUpdateRate({
                            ...rate,
                            name: e.target.value,
                          });
                        }}
                      />
                      <Input
                        type="color"
                        value={rate.color}
                        onChange={(e) => {
                          handleUpdateRate({
                            ...rate,
                            color: e.target.value,
                          });
                        }}
                        className="px-[2px] py-0"
                      />
                    </div>
                  ) : (
                    <span
                      className="flex h-9 items-center gap-2 rounded-sm px-2 py-1"
                      style={{
                        color: rate.color,
                        backgroundColor: `rgba(${hexToRgb(rate.color)}, 0.1)`,
                      }}
                    >
                      {rate.name}
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: rate.color,
                        }}
                      ></span>
                    </span>
                  )}
                  {Object.keys(rate.movers_rates)
                    .slice(0, 3)
                    .map((mover, i) => {
                      const hRate = rate.movers_rates[mover].hourly_rate;
                      if (currentEdit === idx) {
                        return (
                          <PriceInput
                            value={hRate}
                            onValueChange={(val) => {
                              handleUpdateRate({
                                ...rate,
                                movers_rates: {
                                  ...rate.movers_rates,
                                  [mover]: {
                                    ...rate.movers_rates[mover],
                                    hourly_rate: val,
                                  },
                                },
                              });
                            }}
                            key={i}
                          />
                        );
                      }
                      return (
                        <div key={i}>{formatCentsToDollarsString(hRate)}</div>
                      );
                    })}
                  <div>
                    {currentEdit === idx ? (
                      <PriceInput
                        value={rate.extra_mover_rate}
                        onValueChange={(val) =>
                          handleUpdateRate({
                            ...rate,
                            extra_mover_rate: val,
                          })
                        }
                      />
                    ) : (
                      formatCentsToDollarsString(rate.extra_mover_rate)
                    )}
                  </div>
                  <div>
                    {currentEdit === idx ? (
                      <PriceInput
                        value={rate.extra_truck_rate}
                        onValueChange={(val) =>
                          handleUpdateRate({
                            ...rate,
                            extra_truck_rate: val,
                          })
                        }
                      />
                    ) : (
                      formatCentsToDollarsString(rate.extra_truck_rate)
                    )}
                  </div>
                  <Switch
                    id={rate.name}
                    checked={rate.enable}
                    disabled={rate.id === 1}
                    onCheckedChange={(checked) => {
                      handleUpdateRate({
                        ...rate,
                        enable: checked,
                      });
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentEdit((prev) => (prev === idx ? null : idx));
                    }}
                  >
                    <SquarePenIcon />
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
        <CardFooter className="justify-end border-t pt-6">
          <div
            className={cn(
              'flex min-h-9 w-full gap-4 transition-opacity duration-500 sm:w-auto',
              {
                'invisible opacity-0': !isChanged,
                'visible opacity-100': isChanged,
              }
            )}
          >
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(dbRates!);
                setIsChanged(false);
                setCurrentEdit(null);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={isUpdating}
              loading={isUpdating}
              onClick={async () => {
                await bulkUpdateRates({ rates: items }).unwrap();
                setIsChanged(false);
                setCurrentEdit(null);
                toast.success('Changes saved');
              }}
            >
              Save changes
            </LoadingButton>
          </div>
        </CardFooter>
      </Card>
    </SettingPageWrapper>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 px-1 py-4"
        >
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </>
  );
}
