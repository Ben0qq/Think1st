import {Form} from "../src/components/Form"
export default function App() {

  return (
    <main className="w-full h-full flex justify-center py-[96px]">
      <div className="w-[342px] sm:w-[434px] flex flex-col justify-start">
        <p className="text-2xl font-medium mb-8">Personal info</p>
        <Form />
      </div>
    </main>
  );
}