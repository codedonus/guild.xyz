import useOauthPopupWindow from "@/hooks/useOauthPopupWindow"
import { env } from "env"

const useDriveOAuth = () =>
  useOauthPopupWindow<{ access_token: string }>(
    "GOOGLE",
    "https://accounts.google.com/o/oauth2/v2/auth",
    {
      scope: `openid email profile https://www.googleapis.com/auth/drive.file`,
      response_type: "token",
      client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }
  )

export default useDriveOAuth
