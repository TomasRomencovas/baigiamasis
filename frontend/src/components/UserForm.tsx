import { useState } from "react";

// Describing the users input data that we will send as a request body
export type NewUserType = {
  name: string;
  email: string;
  age: string;
};

// Describing the props that we can get from parent element
type UserInputPropsType = {
  buttonName: string;
  nameValue?: string;
  emailValue?: string;
  ageValue?: number;
  sendInputData: (newUser: NewUserType) => void;
  isLoadingSubmit: boolean;
};

export default function UserForm({
  buttonName,
  nameValue,
  emailValue,
  ageValue,
  sendInputData,
  isLoadingSubmit,
}: UserInputPropsType) {
  // Setting states for name, email and age inputs
  const [nameInput, setNameInput] = useState(nameValue || "");
  const [emailInput, setEmailInput] = useState(emailValue || "");
  const [ageInput, setAgeInput] = useState(ageValue?.toString() || "");

  // Function that creates an object from the inputs in correct order and sends them to a function that either updates a user or creates new one
  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newUser = {
      name: nameInput,
      email: emailInput,
      age: ageInput,
    };

    sendInputData(newUser);
  }

  // Setting all the inputs and a submit button for display
  return (
    <form onSubmit={(event) => submitForm(event)} className="user-form">
      <input
        type="text"
        placeholder="Full Name"
        value={nameInput}
        onChange={(event) => setNameInput(event.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={emailInput}
        onChange={(event) => setEmailInput(event.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Age"
        value={ageInput}
        onChange={(event) => setAgeInput(event.target.value)}
      />
      <br />
      <button disabled={isLoadingSubmit} type="submit">
        {buttonName}
      </button>
    </form>
  );
}
