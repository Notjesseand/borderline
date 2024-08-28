import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/useDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
export function AlertDialogDemo() {
  const { isOpen, onClose } = useDialog();

  const router = useRouter();
  const redirect = () => {
    router.push("/");
  };

  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">
            <img src="/alert.png" alt="" className="my-4" />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mt-2">
            <span className="text-2xl text-black flex justify-center">
              You have added 1 farm!
            </span>

            <span className="mt-1 text-[15px] flex justify-center">
              would you like to add another farm?
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center flex-col gap-3 mt-5">
          {/* <AlertDialogAction className="bg-[#0D8A6A] py-2.5 border-2 border-[#0D8A6A]">
            <Link href={"/login"} className="w-full h-full">
              No, create my account
            </Link>
          </AlertDialogAction> */}
          <div className="justify-center py-2.5 border-2 border-[#0d8a6a] bg-[#0D8A6A] text-white text-center rounded-lg">
            <Link href={"/login"} className="w-full h-full">
              No, create my account
            </Link>
          </div>
          {/* <AlertDialogCancel className="justify-center mt-2"> */}
          <div className="justify-center py-2.5 border-2 border-slate-400 rounded-lg">
            <Link href={"/new-farm"} className="w-full h-full">
              <button className="w-full h-full" onClick={onClose}>
                Yes, I have another farm
              </button>
            </Link>
          </div>
          {/* </AlertDialogCancel> */}
        </div>
        {/* <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel>No, create my account</AlertDialogCancel>
          <AlertDialogAction>Yes, I have another farm</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
