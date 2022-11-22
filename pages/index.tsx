import type { NextPage } from 'next';
import {useOidcIdToken, withOidcSecure} from "@fundthatflip/ftf-auth-library";
import handleDynamicImport from "../utils/handle-dynamic-import";

const TodoList: any = handleDynamicImport('todoModule/TodoList')

const Home: NextPage = () => {
  const { idToken } = useOidcIdToken();

  return (
    <div className='m-4'>
      <TodoList idToken={idToken} />
    </div>
  );
};

export default withOidcSecure(Home, '/');
