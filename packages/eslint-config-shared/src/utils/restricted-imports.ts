import { ValidNoRestrictedImportPatternOptions } from 'eslint/rules';

const internalPackages = [
  '@natu/api-contracts',
  '@natu/axe',
  '@natu/browserslist-config-shared',
  '@natu/eslint-config-shared',
  '@natu/stories',
  '@natu/styles',
  '@natu/orval',
  '@natu/tsconfig',
  '@natu/ui-angular',
  '@natu/ui-react',
  '@natu/vrt',
  'rotom',
  'smeargle',
] as const;

type InternalPackage = (typeof internalPackages)[number];

type CustomRule = {
  restrictedPackages: string[];
  allowedIn: InternalPackage[];
  message: string;
};

/**
 * Defines a hierarchy for all packages and apps in the monorepo.
 * Sorted from most permissive to least permissive.
 *
 * A package cannot import packages from the same layer or from a higher one, including itself.
 *
 * @example
 * const packageLayers = [
 *  '@natu/styles', // can be imported by natu/ui-angular, natu/ui-react or smeargle
 *  ['@natu/ui-angular', '@natu/ui-react'], // can only be imported by smeargle
 *  'smeargle' // cannot be imported by any package
 * ];
 */
const packageLayers: Array<InternalPackage | InternalPackage[]> = [
  // General utils
  '@natu/tsconfig',
  '@natu/eslint-config-shared',
  '@natu/browserslist-config-shared',
  // Specialized utils
  ['@natu/stories', '@natu/vrt', '@natu/axe', '@natu/orval', '@natu/api-contracts'],
  // UI utils
  '@natu/styles',
  ['@natu/ui-angular', '@natu/ui-react'],
  // Apps
  ['rotom', 'smeargle'],
];

// Not needed for now as pnpm already acts as a safeguard to prevent using subpackages without adding to the package.json
const customRules: CustomRule[] = [];

/** Creates regex to restrict imports of a package and any submodule */
function createRestrictedPackageRegex(packageName: string) {
  return `^${packageName}(/.*)?$`;
}

/**
 * Controls where packages can be imported for all packages in the monorepo.
 *
 * Builds the `no-restricted-imports` pattern rules for a given package.
 * Based on the repository package hierarchy and custom restrictions.
 *
 * @param packageName - The package for which restricted import patterns are generated.
 * @returns A list of restriction patterns
 */
export function buildRestrictedPatterns(
  packageName: InternalPackage,
): ValidNoRestrictedImportPatternOptions[] {
  const layerIndex = packageLayers.findIndex((layer) =>
    typeof layer === 'string'
      ? layer === packageName
      : layer.some((layerPackage) => layerPackage === packageName),
  );

  const restrictedLayerPackages = packageLayers
    .slice(layerIndex)
    .flatMap((layer) => (typeof layer === 'string' ? [layer] : layer))
    .map((restrictedPackage) => ({
      regex: createRestrictedPackageRegex(restrictedPackage),
      message: `Package "${packageName}" is not allowed to import "${restrictedPackage}" as it does not follow the package hierarchy`,
    }));

  const customRestrictedPackages = customRules
    .filter(({ allowedIn }) => !allowedIn.some((allowedPackage) => allowedPackage === packageName))
    .flatMap(({ message, restrictedPackages }) =>
      restrictedPackages.map((restrictedPackage) => ({
        message,
        regex: createRestrictedPackageRegex(restrictedPackage),
      })),
    );

  return [...restrictedLayerPackages, ...customRestrictedPackages];
}
