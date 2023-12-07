import HuertoSimulado from '../src/screens/huertoSimulado';
import * as userApi from '../src/api/user'; // Asume que getUserInfo está aquí

// Mock de fetch
jest.mock('expo-secure-store', () => {
  return {
    setItemAsync: jest.fn((key, value) => Promise.resolve()), // Simula guardar un ítem
    getItemAsync: jest.fn((key) => Promise.resolve("mock-value")), // Simula obtener un ítem
    deleteItemAsync: jest.fn((key) => Promise.resolve()), // Simula eliminar un ítem
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Simula una respuesta vacía
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it('debe medir el tiempo que tarda loadData en ejecutarse', async () => {
  const inicio = performance.now(); // Inicia el temporizador

  // Simula getUserInfo para que no haga una llamada API real
  jest.spyOn(userApi, 'getUserInfo').mockResolvedValue({ id: '123' });

  const componente = new HuertoSimulado(); // Crea una instancia del componente
  await componente.loadData(); // Ejecuta loadData

  const fin = performance.now(); // Detiene el temporizador

  const duracion = fin - inicio; // Calcula la duración
  console.log(`La carga de datos tomó ${duracion} milisegundos`);

  // Asegúrate de que la duración sea menor que un umbral definido, por ejemplo, 5000 milisegundos
  expect(duracion).toBeLessThan(5000);
});
