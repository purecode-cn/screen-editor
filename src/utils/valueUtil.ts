export function defaultGetValueFromEvent(valuePropName: string, ...args: any[]) {
  const event = args[0];
  if (event && event.target && valuePropName in event.target) {
    return (event.target as HTMLInputElement)[valuePropName];
  } 
  return event;
}