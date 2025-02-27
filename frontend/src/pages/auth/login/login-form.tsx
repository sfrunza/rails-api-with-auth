import { Link, useNavigate } from 'react-router'
import { LoadingButton } from '@/components/loading-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '@/services/auth-api'

export function LoginForm() {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email_address = form.email_address.value
    const password = form.password.value

    const response = await login({ email_address, password }).unwrap()
    switch (response.user.role) {
      case 'admin':
        navigate('/crm', { replace: true })
        break
      case 'manager':
        navigate('/crm', { replace: true })
        break
      case 'customer':
        navigate('/account', { replace: true })
        break
      default:
        navigate('/', { replace: true })
        break
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email_address">Email</Label>
            <Input
              id="email_address"
              type="email"
              placeholder="m@example.com"
              defaultValue={'frunza.sergiu3@gmail.com'}
              required
              autoComplete="email"
              name="email_address"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              defaultValue={'111111'}
              required
            />
          </div>
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            Login
          </LoadingButton>
        </form>
        <div className="mt-4 text-sm">
          <Link
            to="/auth/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
