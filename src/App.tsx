import { UserManage } from './users';
import { Upload } from './upload';
import { Ticket } from './ticket';

function App() {
  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-4xl p-6">
      <UserManage />
      <Upload />
      <Ticket />
    </main>
  );
}

export default App;
