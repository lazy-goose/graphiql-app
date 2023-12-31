export default {
  FragmentWindow: (index?: number) =>
    `ResizeGroup-Fragment-WindowBox${index ? `-${index}` : ''}`,
  FragmentResizer: (index?: number) =>
    `ResizeGroup-Fragment-SmartResizer${index ? `-${index}` : ''}`,
}
