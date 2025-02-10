import * as ts from 'typescript';

export function extractHtmlProps(): Record<string, string[]> {
  const program = ts.createProgram([], { jsx: ts.JsxEmit.React });
  const checker = program.getTypeChecker();

  const sourceFile = ts.createSourceFile(
    'temp.ts',
    'declare namespace JSX { interface IntrinsicElements {} }',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );

  const jsxNamespace = sourceFile.statements.find(
    stmt => ts.isModuleDeclaration(stmt) && stmt.name.getText() === 'JSX'
  ) as ts.ModuleDeclaration;

  if (
    !jsxNamespace ||
    !jsxNamespace.body ||
    !ts.isModuleBlock(jsxNamespace.body)
  ) {
    throw new Error('JSX namespace not found.');
  }

  const intrinsicElements = jsxNamespace.body.statements.find(
    stmt =>
      ts.isInterfaceDeclaration(stmt) &&
      stmt.name.getText() === 'IntrinsicElements'
  ) as ts.InterfaceDeclaration;

  if (!intrinsicElements) {
    throw new Error('IntrinsicElements not found.');
  }

  const elements: Record<string, string[]> = {};

  intrinsicElements.members.forEach(member => {
    if (
      ts.isPropertySignature(member) &&
      member.name &&
      ts.isIdentifier(member.name)
    ) {
      const tagName = member.name.text;
      const props: string[] = [];

      const type = checker.getTypeAtLocation(member);
      type.getProperties().forEach(prop => props.push(prop.getName()));

      elements[tagName] = props;
    }
  });

  return elements;
}
