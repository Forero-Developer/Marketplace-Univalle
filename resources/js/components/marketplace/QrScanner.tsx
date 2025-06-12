import { useState } from 'react';
import { useZxing } from 'react-zxing';

export default function QrScanner() {
  const [result, setResult] = useState('');
  
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
    onError(error) {
      console.error(error);
    }
  });

  return (
    <div className="flex flex-col items-center">
      <video
  ref={ref}
  style={{
    width: 300,
    height: 300,
    borderRadius: 12,
    border: '2px solid #ccc',
    display: 'block',
    backgroundColor: '#000',
  }}
  muted
  autoPlay
  playsInline
/>
      
      {result && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <strong>Resultado escaneado:</strong> {result}
        </div>
      )}
    </div>
  );
}
