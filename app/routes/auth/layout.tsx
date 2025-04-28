import { cn } from "presentation/lib/utils";
import { Outlet, useParams } from "react-router";

const AuthLayout = () => {
  const { id } = useParams();

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-300">
      <section
        className={cn(
          `z-10 sm:flex md:flex-row sm:w-auto w-full lg:w-3/7 bg-white h-full rounded-xl mx-5 m-5`,
          {
            "flex-col-reverse sm:w-4/5": id,
          }
        )}
      >

        <article className="sm:flex-1 sm:flex justify-center items-center bg-white rounded-xl">
          <Outlet />
        </article>
      </section>
    </main>
  );
};

export default AuthLayout;
