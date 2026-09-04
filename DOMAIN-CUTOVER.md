# Domain cutover: ragingscout97.in → portfolio-design-02

New project is live:
- https://portfolio-design-02.vercel.app
- Vercel project: `portfolio-design-02` (`prj_nU9hkgtC1ijCs98t600ySeqJ5zHp`)

Old Angular project still owns the custom domain:
- Project: `portfolio` (`prj_1awzR8SYEROYk1gPXXzT2v2KzdVg`)
- Domain: `ragingscout97.in`

## Do this in Vercel Dashboard (2 minutes)

1. Open old project domains:  
   https://vercel.com/ragingscout97s-projects/portfolio/settings/domains  
   → Remove `ragingscout97.in` (and `www` if present)

2. Open new project domains:  
   https://vercel.com/ragingscout97s-projects/portfolio-design-02/settings/domains  
   → Add `ragingscout97.in` and `www.ragingscout97.in`

3. Leave admin alone: `admin.ragingscout97.in` stays on `portfolio-admin-dashboard`

4. Optional: delete or disconnect the old `portfolio` Vercel project so it cannot reclaim the domain.

## Or via CLI (after `npx vercel login`)

```bash
npx vercel domains rm ragingscout97.in --yes
npx vercel domains add ragingscout97.in portfolio-design-02 --scope ragingscout97s-projects
```
