/** Lifetime membership page components */
export const LifetimeMember = {
    prevBtn: () => cy.get('.swiper-button-prev'),
    nextBtn: () => cy.get('.swiper-button-next'),
    activeSlide: () => cy.get('.swiper-slide-active', { timeout: 30000 }),
    slider: () => cy.get('.elementor-element-afce970').scrollIntoView(),
    exploreBtn: () => cy.contains('a.fancybox', 'EXPLORE LIFETIME MEMBERSHIP')
};
