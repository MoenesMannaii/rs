export const structure = (S: any) =>
  S.list()
    .title('Blog')
    .items([
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem: any) => listItem.getId() !== 'adventures'
      ),
    ]);
