import { argsToTemplate } from '@storybook/angular';
import { ArgsToTemplateOptions } from '@storybook/angular/dist/client/argsToTemplate';

export function aliasArgs<T extends Record<string, unknown>>(args: T, alias: string) {
  const aliasedArgs = Object.entries(args).map(([key, value]) => [
    `${alias}${key[0]?.toUpperCase()}${key.slice(1)}`,
    value,
  ]);

  return Object.fromEntries(aliasedArgs) as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function aliasedArgsToTemplate<T extends Record<string, any>>(
  args: T,
  alias: string,
  options?: ArgsToTemplateOptions<keyof T>,
): string {
  const aliasedArgs = aliasArgs(args, alias);

  const aliasedOptions = {
    include: options?.include?.map((value) => alias + value.toString()),
    exclude: options?.exclude?.map((value) => alias + value.toString()),
  };

  return argsToTemplate(aliasedArgs, aliasedOptions);
}
