import ClientForm from '../forms/ClientForm';

export default function ClientFormExample() {
  const handleSubmit = async (data: any) => {
    console.log('Dados do cliente:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="p-4 max-w-2xl">
      <ClientForm
        onSubmit={handleSubmit}
        onCancel={() => console.log('Cancelar clicado')}
      />
    </div>
  );
}