// import { useNavigate } from 'react-router'
import { ChevronDownIcon } from 'lucide-react'
import { LoadingButton } from '@/components/loading-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  // DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
// import { useCreateRequestMutation } from '@/services/requests-api'
// import { useGetServicesQuery } from '@/services/services-api'

export function CreateRequestButton() {
  // const navigate = useNavigate()
  // const [createRequest, { isLoading }] = useCreateRequestMutation()
  // const { data: services } = useGetServicesQuery({});

  // const enabledServices = services?.filter((service) => service.enabled);

  // async function handleCreateRequest(serviceId: number) {
  //   const response = await createRequest({ service_id: serviceId }).unwrap()
  //   navigate(`/dashboard/requests/${response.id}`)
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LoadingButton
          // loading={isLoading}
          // disabled={isLoading || enabledServices?.length === 0}
          loading={false}
          disabled={false}
        >
          <span className="flex items-center justify-between gap-2">
            <span className="hidden md:inline-flex">Create Request</span>
            <span className="inline-flex md:hidden">New</span>
            <ChevronDownIcon className="size-5" />
          </span>
        </LoadingButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {/* {enabledServices?.map((service, i) => (
            <DropdownMenuItem
              key={i}
              className="cursor-pointer"
              onClick={() => handleCreateRequest(service.id)}
            >
              {service.name}
            </DropdownMenuItem>
          ))} */}
          placeholder
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
