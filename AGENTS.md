<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep discovery and lineage sample datasets beside their workspace components and label local-only actions clearly; no live scan, persistence, or enforcement service is connected.
- Lazy-load the lineage graph only in the browser and provide an event table alternative; canvas dependencies must not break server rendering or accessibility.
