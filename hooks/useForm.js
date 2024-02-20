import { useState, useEffect } from "react"
import { omit } from "lodash"

export default function useForm() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [errorMessages, setErrorMessages] = useState({})
  const [validations, setValidations] = useState({})

  const setFormValues = (values) => {
    setValues(values)
  }

  // Get input that is being edited, validate it and set the value
  const handleChange = (event) => {
    let value = event.target.value
    const name = event.target.name
    const type = event.target.type

    if (type === "text" && value.length > 0) value = value.trim()

    validate(name, value, validations)

    setValues({
      ...values,
      [name]: value
    })
  }

  // Clear all values and errors
  const refreshValues = () => {
    setValues([])
    setErrors({})
  }

  // Return true if all fields are valid
  const validateForm = () => {
    let validForm = true
    Object.keys(values).forEach((key) => {
      if (!validate(key, values[key])) validForm = false
    })
    return validForm
  }

  // Set the validations for the form
  const setFormValidations = (vals) => {
    setValidations(vals)
  }

  // Clear errors for a specific field and validation
  const clearErrors = (name, validation) => {
    if (errors[name] && errors[name][validation]) {
      let updatedError = omit(errors[name], validation)
      const emptyErrorSet = Object.keys(updatedError).length === 0

      setErrors((prevState) =>
        emptyErrorSet
          ? omit(prevState, name)
          : {
              ...prevState,
              [name]: updatedError
            }
      )
    }
  }

  // Set the error messages for the form
  useEffect(() => {
    let updatedMsgs = {}

    Object.keys(errors).forEach((e) => {
      updatedMsgs[e] = errors[e][Object.keys(errors[e])[0]]
    })

    setErrorMessages(updatedMsgs)
  }, [errors])

  // Validate a specific field given its name and value and a set of validations
  const validate = (name, value) => {
    let validForm = true
    if (validations[name]) {
      Object.keys(validations[name]).map((validation) => {
        clearErrors(name, validation)
        switch (validation) {
          case "required":
            if (validations[name][validation] && !value) {
              validForm = false
              setErrors((prevState) => ({
                ...prevState,
                [name]: { ...prevState[name], required: "Required field" }
              }))
            }
            break

          default:
            break
        }
      })
    }
    return validForm
  }

  return {
    values,
    errorMessages,
    setFormValues,
    setFormValidations,
    refreshValues,
    handleChange,
    validateForm
  }
}
