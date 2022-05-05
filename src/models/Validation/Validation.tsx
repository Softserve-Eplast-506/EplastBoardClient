import {
  emptyInput,
  maxLength,
  incorrectDescription,
  incorrectTitle,
} from "../../components/Notifications/Messages";

export const descriptionValidation = {
  TitleColumn: [
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
  TitleCard: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectTitle,
    },
    {
      max: 200,
      message: maxLength(200),
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
      max: 1000,
      message: maxLength(1000),
    },
    {
      required: false,
      message: emptyInput(),
    },
  ],
};
