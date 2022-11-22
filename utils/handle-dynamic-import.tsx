import {DynamicOptionsLoadingProps} from "next/dist/shared/lib/dynamic";
import dynamic from "next/dynamic";

export default (component: string) => dynamic(() => import(component), {
  ssr: false,
  loading: ({ error }: DynamicOptionsLoadingProps) => {
    if (error) {
      return <span>{error.message}</span>;
    }
    return <span>Loading</span>;
  }
});
