# @itookit/vfsdriver-indexeddb

Browser IndexedDB storage backend for `@itookit/vfs-core`. Supports files,
directories, tags, SeqFile records and native transactions for host adapters.
The driver implements storage mechanisms; synchronization policy belongs to the host.
Its only runtime dependency is `@itookit/vfs-core`.

## Development

```sh
git clone git@github.com:mushuanli/vfsdriver-indexeddb.git
cd vfsdriver-indexeddb
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
pnpm pack
```

Development and packed releases both depend on the npm `latest` tag of `@itookit/vfs-core`.
No core source checkout or Git submodule is required. The lockfile records the exact
version used for development and CI; frozen installs do not automatically upgrade it.
To refresh core, run `pnpm update @itookit/vfs-core`, then run typechecking, tests and
the build. The `latest` tag can also advance to a new major version.

## Usage

```ts
import { createVFS } from '@itookit/vfs-core';
import { IndexedDBBackend } from '@itookit/vfsdriver-indexeddb';

const backend = new IndexedDBBackend({ dbName: 'my-project' });
const { manager } = await createVFS({ rootBackend: backend });
const fs = await manager.openFileSystem('/');
await fs.driver.createFile({ parentPath: '/', name: 'hello.txt', content: 'Hello' });
await manager.dispose();
```

IndexedDB persistence follows the browser storage policy. Application-level pins
cannot prevent browser eviction. Hosts should detect lost control storage and
request persistent storage when appropriate.

## itookit integration

itookit installs the driver and core from npm. For example:

```sh
pnpm add @itookit/vfsdriver-indexeddb @itookit/vfs-core --save-exact
```

Database schema and driver implementation notes are in [AGENTS.md](AGENTS.md).
