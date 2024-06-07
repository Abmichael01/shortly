import MainLayout from "../layouts/MainLayout"
import AuthForm from "../components/AuthForm"

const Signup = () => {
  return (
    <MainLayout>
      <div className="flex justify-center">
        <AuthForm route="/api/user/register/" method="Signup" />
      </div>
    </MainLayout>
  )
}

export default Signup
