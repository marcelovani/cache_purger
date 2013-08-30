Module: Cache Purger

Description
===========
Purges blocks/views caches when entities get updated
Allows site admins to purge cache for a specific block by clicking on the purge icon.
Automatically purge selected entities when they are saved or updated.

Compatible with:

Node
Views
Blocks
Memcache
Nodequeue
At the moment there is no intention to have the functionality to purge page cache, 
which means, for anonymous users to see the updates you still need to clear the page cache. 
Page cache flush can possibly be added in the future if users find it necessary, please comment.

Installation
============
Put the modules into your sites/module folder
Enable the module and set user permissions
Visit Configuration > Development > Cache Purger

Configuration
=============
Visit /admin/config/development/cachepurger
or via menus: Configuration > Development > Cache Purger

If you tick 'Purge blocks cache automatically' Cache Purger will lush blocks cache 
when changes are made on entities and nodequeues, etc

Visit the permissions page and set them accordingly

Flushing blocks
===============
Click the flush icon when you see the it

Automatic flushing entity cache
===============================
On the configuration page, tick the entities that should be automatically flushed
