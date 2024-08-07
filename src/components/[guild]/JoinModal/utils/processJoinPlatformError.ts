import { ErrorInfo } from "@/components/Error"
import { DiscordError, WalletError } from "types"
import processWalletError from "utils/processWalletError"
import processConnectorError from "./processConnectorError"
import processDiscordError from "./processDiscordError"

type JoinError = WalletError | Response | Error | DiscordError | string

const processJoinPlatformError = (error: JoinError): ErrorInfo => {
  // if it's a network error from fetching
  if (error instanceof Error) {
    if (
      [
        "MetaMask Message Signature: User denied message signature.",
        "Math Wallet User Cancelled",
        "Sign request rejected",
      ].includes(error.message)
    )
      // With WalletConnect these errors also come as Error objects, not object literals
      return processWalletError({ code: 4001, message: "" })

    return {
      title: error.name,
      description: error.message,
    }
  }
  // if it's a HTTP error from fetching
  if (error instanceof Response) {
    return {
      title: "Backend error",
      description: "The backend couldn't handle the request",
    }
  }
  if (typeof error === "string") {
    const connectorError = processConnectorError(error)

    return {
      title: "Error",
      description: connectorError ?? error,
    }
  }

  // If it's an error from Discord auth
  if ("error" in error && "errorDescription" in error)
    return processDiscordError(error)

  // if it's an error from signing
  return processWalletError(error)
}

export default processJoinPlatformError
