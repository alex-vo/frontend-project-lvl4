import 'regenerator-runtime/runtime';
import path from 'path';
import readPackageJson from 'read-package-json-fast';
import _ from 'lodash';

const getEntryPointPath = async (projectPath) => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageSource = await readPackageJson(packageJsonPath);
  // TODO: find a ready-made solution with normalization
  const main = _.get(packageSource, 'main', 'index.js');
  return path.join(projectPath, main);
};

test('entry point', async () => {
  const codePath = path.join(path.resolve());
  const entryPointPath = await getEntryPointPath(codePath);

  const enryPointModule = await import(entryPointPath);
  expect(typeof enryPointModule.default).toEqual('function');
});
