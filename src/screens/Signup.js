import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Wrapper } from "../components/auth/Wrapper";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { Input } from "../components/auth/Input";
import { Header } from "../components/auth/Header";
import FormBox from "../components/auth/FormBox";
import { Button } from "../components/auth/Button";
import { useHistory } from "react-router";
import { routes } from "../routes";
import {Link} from "react-router-dom";
import LinkBox from "../components/auth/LinkBox";
import PageMode from "../components/PageMode";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $name: String!
        $password: String!
    ) {
        createAccount(
            username: $username
            email: $email
            name: $name
            password: $password
        ) {
            ok
            error
        }
    }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

function SignUp() {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange",
    });
    const onCompleted = (data) => {
        const {
            createAccount: { ok, error },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        const { username, password } = getValues();
        history.push(routes.home, {
            message: "Account created. please log in.",
            username,
            password,
        });
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data,
            },
        });
    };
    const clearLoginError = () => {
        clearErrors("result");
    };
    return (
        <Wrapper>
            <PageTitle title="Sign Up | Nomad Coffee" />
            <Header>
                <H1>Nomad Coffee</H1>
                <FontAwesomeIcon icon={faCoffee} />
            </Header>
            <FormBox>
                <form onSubmit={handleSubmit(onSubmitValid)}>

                    <Input
                        {...register("username", {
                            required: "Username is required",
                            minLength: 4,
                        })}
                        onFocus={clearLoginError}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <Input
                        {...register("email", {
                            required: "Email is required.",
                        })}
                        onFocus={clearLoginError}
                        type="email"
                        placeholder="Email"
                        hasError={Boolean(errors?.email?.message)}
                    />
                    <Input
                        {...register("password", {
                            required: "Password is required",
                            minLength: 5,
                        })}
                        onFocus={clearLoginError}
                        type="password"
                        placeholder="Password (At least 5 characters)"
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <Input
                        {...register("name", {
                            required: "name is required",
                        })}
                        onFocus={clearLoginError}
                        type="text"
                        placeholder="Name"
                        hasError={Boolean(errors?.name?.message)}
                    />
                    <FormError message={errors?.username?.message} />
                    <FormError message={errors?.password?.message} />
                    <FormError message={errors?.name?.message} />
                    <FormError message={errors?.result?.message} />
                    <Button type="submit" disabled={!formState.isValid || loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </Button>
                </form>
            </FormBox>
            <LinkBox
              text="????????? ????????????????"
              link={routes.home}
              linkText="?????????"
            />
            <PageMode/>
        </Wrapper>
    );
}

export default SignUp;
