import dns from 'dns'

import { defineConfig } from 'vite'

import redwood from '@redwoodjs/vite'

// So that Vite will load on localhost instead of `127.0.0.1`.
// See: https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder('verbatim')

const viteConfig = {
  plugins: [redwood()],
  server: {
	  host: '2600:1f14:3568:3400:f41e:5842:b47c:d7e'
  },
}

export default defineConfig(viteConfig)
