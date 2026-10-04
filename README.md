# @itookit/vfsdriver-indexeddb

Browser IndexedDB storage backend for `@itookit/vfs-core`. Supports files,
directories, tags, SeqFile records and native transactions for host adapters.
The driver implements storage mechanisms; synchronization policy belongs to the host.
Its only runtime dependency is `@itookit/vfs-core`.

## Development

```sh
git clone --recurse-submodules git@github.com:mushuanli/vfsdriver-indexeddb.git
cd vfsdriver-indexeddb
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
pnpm pack
```

`vendor/vfs-core` pins the core source used for independent development.
Inside itookit, the outer workspace resolves its own `packages/vfs-core` instead.
Packed releases contain only the driver and reference core as an npm dependency.

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

The package is a Git submodule. After cloning itookit:

```sh
git submodule update --init --recursive packages/vfs-core packages/vfsdriver-indexeddb
```

Database schema and driver implementation notes are in [AGENTS.md](AGENTS.md).
