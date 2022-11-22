import {NextPage} from "next";
import {useOidcIdToken, withOidcSecure} from '@fundthatflip/ftf-auth-library';
import handleDynamicImport from "../../utils/handle-dynamic-import";

const AddTodo: any = handleDynamicImport('todoModule/AddTodo');

export const AddItemPage: NextPage = () => {
  const { idToken } = useOidcIdToken();

  return <>
    <AddTodo idToken={idToken} />
  </>;
}

export default withOidcSecure(AddItemPage, '/add');
