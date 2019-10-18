Tooling for NixCon 2019 live GFX.

## Some notes

`nixcon-projector/config.json` in the XDG config dir is the data used by the
viewer; in other words this is what obs will present.

Changes in the interfaces are not committed to the file until *Save data and
switch GFX* is activated.

Likewise, selecting a value in the list of pre-made configurations will not
commit to the file. It needs to be commited via *Save data and switch GFX*.

> This is mostly a limitation by the cheaty way of using that file, and the
> hot reloading of webpack as an IPC to synchronize the state of the electron
> viewer and the webpage shown in obs. Live editing could happen via more fancy
> HTTP based IPC, but eh, this cost nothing to implement.
