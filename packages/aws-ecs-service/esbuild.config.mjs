import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/aws-ecs-service.js',
  bundle: true,
  platform: 'node',
  target: 'es2020',
  sourcemap: true,
});
