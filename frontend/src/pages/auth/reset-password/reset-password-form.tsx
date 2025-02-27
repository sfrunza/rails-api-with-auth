import { Link, useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { useResetPasswordMutation } from '@/services/auth-api'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/loading-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export function ResetPasswordForm() {
  const redirect = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const password = form.password.value
    resetPassword({ password, token: token ?? '' })
      .unwrap()
      .then((response) => {
        toast.success(response.message)
        redirect('/auth/login')
      })
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Change your password</CardTitle>
        <CardDescription>
          Enter a new password below to change your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              placeholder="New password"
              required
              defaultValue={'333333'}
              autoComplete="off"
            />
          </div>
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            Change password
          </LoadingButton>
        </form>
        <div className="mt-4 text-sm">
          <Link to="/auth/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
