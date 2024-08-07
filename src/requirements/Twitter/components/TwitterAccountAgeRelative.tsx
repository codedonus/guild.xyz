import { FormControl, FormLabel } from "@chakra-ui/react"
import FormErrorMessage from "components/common/FormErrorMessage"
import { ControlledRelativeTimeInput } from "components/common/RelativeTimeInput"
import { useFormState } from "react-hook-form"
import { RequirementFormProps } from "requirements/types"
import parseFromObject from "utils/parseFromObject"

const TwitterAccountAgeRelative = ({
  baseFieldPath,
}: RequirementFormProps): JSX.Element => {
  const { errors } = useFormState()

  return (
    <FormControl
      isRequired
      isInvalid={!!parseFromObject(errors, baseFieldPath)?.data?.minAmount}
    >
      <FormLabel>Minimum account age</FormLabel>

      <ControlledRelativeTimeInput
        fieldName={`${baseFieldPath}.data.minAmount`}
        isRequired
      />

      <FormErrorMessage>
        {parseFromObject(errors, baseFieldPath).data?.minAmount?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default TwitterAccountAgeRelative
