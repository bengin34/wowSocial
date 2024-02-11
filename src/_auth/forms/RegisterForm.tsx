import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterValidation } from "@/lib/validations";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useLoginAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

function RegisterForm() {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: login, isLoading: isLogin } = useLoginAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterValidation>>({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterValidation>) {
    const newUser = await createUserAccount(values);

    !newUser && toast({ title: "Register failed. Please try again" });

    const session = await login({
      email: values.email,
      password: values.password,
    });

    !session && toast({ title: "Login failed. Please try again" });

    const isLogin = await checkAuthUser();

    if (isLogin) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Register failed. Please try again" });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex-center flex-row">
          <img
            className="w-12 h-12"
            src="../../../public/icons/icon-1.webp"
            alt="logo"
          />
          <h2 className="text-xl ml-2">WoW Media</h2>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create e new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use wowMedia please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex  flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center">
            Already an account ?{" "}
            <Link to="/login" className="text-primary-500  text-sm  ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default RegisterForm;
