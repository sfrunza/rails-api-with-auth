import { useState } from 'react';
import { Setting, useGetSettingsQuery } from '@/services/settings-api';
import { Input } from '@/components/ui/input';

interface MoversMatrixProps {
  moversCount: Setting['move_size_options'][0]['movers_count'];
}

export function MoversMatrix({ moversCount }: MoversMatrixProps) {
  const { data } = useGetSettingsQuery();
  const [movers, setMovers] = useState<number[][]>(moversCount);

  if (!data) return null;

  const floorOptions = data?.floor_options;

  const handleChange = (
    originFloor: number,
    destinationFloor: number,
    value: number
  ) => {
    // if (value < 2) return ' ';

    setMovers((prev) =>
      prev.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === originFloor && cIdx === destinationFloor ? value : cell
        )
      )
    );
  };

  return (
    <div className="overflow-hidden">
      <div className="flex h-8 items-center justify-center bg-muted text-center font-semibold">
        To stairs
      </div>
      <div className="flex">
        <div className="flex flex-col items-center justify-center bg-muted font-semibold">
          <div
            className="origin-center -rotate-90 transform whitespace-nowrap"
            style={{ width: '2rem' }}
          >
            From stairs
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-8 w-full [&>*]:text-center">
            <div></div>
            {floorOptions.map((destinationFloor) => (
              <div
                key={destinationFloor.id}
                title={destinationFloor.value}
                className="flex justify-center items-center h-12"
              >
                {destinationFloor.value.slice(0, 3)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-8 w-full [&>*]:text-center">
            {/* <div></div> */}
            <div className="grid grid-rows-7">
              {floorOptions.map((destinationFloor) => (
                <div
                  key={destinationFloor.id}
                  title={destinationFloor.value}
                  className="flex justify-center items-center h-14"
                >
                  {destinationFloor.value.slice(0, 3)}
                </div>
              ))}
            </div>
            <div className="col-span-7">
              {floorOptions.map((originFloor, originIndex) => (
                <div
                  key={originFloor.id}
                  className="flex gap-2 h-14 justify-center items-center justify-items-center border-b"
                >
                  {floorOptions.map((originFloor, destinationIndex) => (
                    <div key={originFloor.id}>
                      <Input
                        // type="number"
                        inputMode="numeric"
                        value={movers[originIndex][destinationIndex]}
                        onChange={(e) =>
                          handleChange(
                            originIndex,
                            destinationIndex,
                            Number(e.target.value)
                          )
                        }
                        // className="size-10 p-0 text-center"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="flex h-8">
            <div className="flex w-8 items-center justify-center" />
            {floorOptions.map((destinationFloor) => (
              <div
                key={destinationFloor.id}
                className="flex flex-1 items-center justify-center text-center text-sm font-semibold capitalize text-muted-foreground"
                title={destinationFloor.value}
              >
                {destinationFloor.value.slice(0, 3)}
              </div>
            ))}
          </div> */}
        {/* {floorOptions.map((originFloor, originIndex) => (
            <div key={originFloor.id} className="flex h-12">
              <div
                key={originFloor.id}
                // className="flex w-10 items-center justify-center divide-y font-bold capitalize text-muted-foreground"
                className="flex w-8 items-center justify-center text-center text-sm font-semibold capitalize text-muted-foreground"
                title={originFloor.value}
              >
                {originFloor.value.slice(0, 3)}floor
              </div>
              {floorOptions.map((originFloor, destinationIndex) => (
                <div key={originFloor.id} className="h-12">
                  <Input
                    type="number"
                    value={movers[originIndex][destinationIndex]}
                    onChange={(e) =>
                      handleChange(
                        originIndex,
                        destinationIndex,
                        Number(e.target.value)
                      )
                    }
                    // className="size-10 p-0 text-center"
                  />
                </div>
              ))}
            </div>
          ))} */}
        {/* </div> */}
      </div>
      {/* <div className=" md:pl-6">
        <p className="">
          Example: From 2st floor To 4th floor-{movers[1][3]}movers
        </p>
      </div> */}
    </div>
  );
}
