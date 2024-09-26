import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language',
  standalone: true
})
export class LanguagePipe implements PipeTransform {

  private languageMap: { [key: string]: string } = {
    'pt-BR': 'Portuguese (Brazil)',
    'pt': 'Portuguese',
    'en': 'English',
    'en-US': 'English (US)',
    'en-GB': 'English (UK)',
    'fr': 'French',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'zh-CN': 'Chinese (Simplified)',
    'ru': 'Russian'
  };

  transform(languageCode: string): string {
    return this.languageMap[languageCode] || languageCode;
  }
}