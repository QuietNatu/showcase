import { AppConfig } from '@/app/core/tokens/config';

declare global {
  interface Window {
    __natu_config__: AppConfig;
  }
}
