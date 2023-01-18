import React, { useState, useContext, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../Input/Input";

const emailReducer = (state, action) => {
  // Updates both the value and isValid every time whenever we recieve the USER_INPUT action. For any other action that reaches the reducer, the other value and isValid are returned.
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.val, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.val,
      isValid: state.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const authCtx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // Pulling out the isValid property from emailState and assigning it the alias emailIsValid, this is not a value assignment, it is an alias assignment.
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // UseEffect is used to handle side-effects. We perform a side-effect when we need to reach outside of our React components to do something.
  // UseEffect runs only if enteredEmail, or enteredPassword changed in the last component re-render cycle, meaning that it will run for every keystroke in our forms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // "cleanup function", essentially a function that runs before useEffect runs again
    return () => {
      // clearing the last timer so that we can set a new one next function execution
      clearTimeout(timeout);
    };
    // useEffect re-runs whenever either of these properties change
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // You pass an action to dispatch email because it is the function that userReducer returns.
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
    } else if (!passwordIsValid) {
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
