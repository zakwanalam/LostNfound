import { useNavigate } from "react-router";
import NProgress from "nprogress";

export default function useLoadingNavigation() {
  const navigate = useNavigate();

  const loadingNavigation = (
    path: string,
    query: string | null = null,
    scrollToElement: string | null = null,
    delay: number = 500
  ): void => {
    NProgress.start();
    // Wait a bit before showing progress (break at start)
    setTimeout(() => {
      NProgress.set(0.3); // Initial slight jump

      //Pause, then go to 50%
      setTimeout(() => {
        NProgress.set(0.6); // Halfway mark

        //  Pause again, then go to 80% and navigate
        setTimeout(() => {
          NProgress.set(0.9); // Just before done
          // Navigate and complete loading
          navigate(path, { state: query != null ? query : undefined });

          if (scrollToElement) {
            setTimeout(() => {
                
              document
                .getElementById(scrollToElement)
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100); // slight scroll delay
          }
          NProgress.done();
        }, delay); 

      }, delay); 

    }, delay);
  };
  return loadingNavigation;
}
