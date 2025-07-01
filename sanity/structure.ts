export const structure = (S: any) =>
  S.list()
    .title('Blog')
    .items([
      S.listItem()
        .title('Adventures')
        .child(S.documentTypeList('adventure').title('Adventures')),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem: any) => listItem.getId() !== 'adventures'
      ),
    ]);
