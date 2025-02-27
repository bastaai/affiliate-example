// global.d.ts
export {};

declare global {
  // Define a type alias for the event data
  type EmitData = Record<string, unknown>;

  interface BastaInterface {
    emit: (event: string, data: EmitData) => void;
  }

  // Declare the global `basta` variable
  const basta: BastaInterface;
}
