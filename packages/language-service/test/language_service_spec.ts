/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {createLanguageService} from '../src/language_service';
import {TypeScriptServiceHost} from '../src/typescript_host';

import {MockTypescriptHost} from './test_utils';

describe('service without angular', () => {
  let mockHost = new MockTypescriptHost(['/app/main.ts', '/app/parsing-cases.ts']);
  mockHost.forgetAngular();
  let service = ts.createLanguageService(mockHost);
  let ngHost = new TypeScriptServiceHost(mockHost, service);
  let ngService = createLanguageService(ngHost);
  const fileName = '/app/test.ng';
  const position = mockHost.getLocationMarkerFor(fileName, 'h1-content').start;

  it('should not crash a get template references',
     () => expect(() => ngService.getTemplateReferences()));
  it('should not crash a get diagnostics',
     () => expect(() => ngService.getDiagnostics(fileName)).not.toThrow());
  it('should not crash a completion',
     () => expect(() => ngService.getCompletionsAt(fileName, position)).not.toThrow());
  it('should not crash a get definition',
     () => expect(() => ngService.getDefinitionAt(fileName, position)).not.toThrow());
  it('should not crash a hover', () => expect(() => ngService.getHoverAt(fileName, position)));
});
