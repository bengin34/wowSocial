import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginValidation } from "@/lib/validations";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

function LoginForm() {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending: isLoggedIn } = useLoginAccount();

  async function onSubmit(user: z.infer<typeof LoginValidation>) {
    try {
      const session = await login({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Login failed. Please try again" });
        navigate("/login");
        return;
      }
      const isLogin = await checkAuthUser();

      if (isLogin) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Register failed. Please try again" });
        return;
      }
    } catch (error) {
      console.log(error);
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
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login your account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          To login, please fill in your email and password
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex  flex-col gap-5 w-full mt-4"
        >
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
            {isUserLoading || isLoggedIn ? (
              <div className="flex-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center">
            Have not an account ?{" "}
            <Link to="/register" className="text-primary-500  text-sm  ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default LoginForm;
