import {
  emptyInput,
  maxLength,
  incorrectDescription,
  incorrectTitle,
} from "../../components/Notifications/Messages";

export const descriptionValidation = {
  Title: [
    {
        pattern: /^\S*((?=(\S+))\2\s?)+$/,
        message: incorrectTitle,
      },
      {
        max: 50,
        message: maxLength(50),
      },
      {
        required: true,
        message: emptyInput(),
      },
  ],
  Description: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectDescription,
    },
    {
      max: 500,
      message: maxLength(500),
    },
    {
      required: false,
      message: emptyInput(),
    },
  ]
}